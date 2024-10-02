import fs from 'fs'
import path from 'path'

// 读取生成的类型文件
const typesFile = path.resolve('./src/openapi/__generated__/index.ts')
const content = fs.readFileSync(typesFile, 'utf-8')

// 从 Swagger JSON 获取 tags 信息
const swaggerJson = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'))
const paths = swaggerJson.paths
const schemas = swaggerJson.components?.schemas || {}

// 收集每个类型对应的 tag
const typeToTags = {}
const processedTypes = new Set()

// 递归处理类型引用
const processTypeRefs = (schema, tags) => {
  if (!schema) return

  // 处理数组类型
  if (schema.type === 'array' && schema.items) {
    processTypeRefs(schema.items, tags)
    return
  }

  // 处理引用类型
  if (schema.$ref) {
    const type = schema.$ref.split('/').pop()
    if (!processedTypes.has(type)) {
      processedTypes.add(type)
      typeToTags[type] = tags
      // 递归处理引用类型的属性
      const refSchema = schemas[type]
      if (refSchema?.properties) {
        Object.values(refSchema.properties).forEach(prop => {
          processTypeRefs(prop, tags)
        })
      }
      if (refSchema?.allOf) {
        refSchema.allOf.forEach(item => {
          processTypeRefs(item, tags)
        })
      }
    }
    return
  }

  // 处理对象类型的属性
  if (schema.properties) {
    Object.values(schema.properties).forEach(prop => {
      processTypeRefs(prop, tags)
    })
  }

  // 处理 allOf
  if (schema.allOf) {
    schema.allOf.forEach(item => {
      processTypeRefs(item, tags)
    })
  }
}

// 处理所有接口
Object.entries(paths).forEach(([, methods]) => {
  Object.values(methods).forEach(method => {
    const tags = method.tags || []

    // 处理请求体
    if (method.requestBody?.content?.['application/json']?.schema) {
      processTypeRefs(
        method.requestBody.content['application/json'].schema,
        tags
      )
    }

    // 处理响应体
    if (method.responses?.default?.content?.['application/json']?.schema) {
      processTypeRefs(
        method.responses.default.content['application/json'].schema,
        tags
      )
    }

    // 处理参数
    if (method.parameters) {
      method.parameters.forEach(param => {
        if (param.schema) {
          processTypeRefs(param.schema, tags)
        }
      })
    }
  })
})

// 将类型按 tag 分组
const typesByTag = {}
Object.entries(typeToTags).forEach(([type, tags]) => {
  const tag = tags.join('/') || 'common'
  if (!typesByTag[tag]) {
    typesByTag[tag] = []
  }
  typesByTag[tag].push(type)
})

// 创建输出目录
const outputDir = path.resolve('./src/openapi/__generated__')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// 为每个 tag 创建单独的文件
Object.entries(typesByTag).forEach(([tag, types]) => {
  let fileContent = ''
  types.forEach(type => {
    const typeRegex = new RegExp(
      `(export (interface|type|enum) ${type}[\\s\\S]*?})`
    )
    const match = content.match(typeRegex)
    if (match) {
      fileContent += match[1] + '\n\n'
    }
  })

  if (fileContent) {
    const directory = tag.split('/')
    const name = directory.pop()
    let directoryPath
    if (directory.length) {
      directoryPath = path.join(outputDir, directory.join('/'))
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true })
      }
    } else {
      directoryPath = outputDir
    }

    const fileName = path.join(directoryPath, `${name}.ts`)
    fs.writeFileSync(fileName, fileContent)
  }
})

fs.unlinkSync(typesFile)
