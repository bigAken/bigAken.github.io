/**
 * @param {*} data
 * @param {*} 判断数据类型返回 object string array boolean number null
 */
const toType = data => {
	return {}.toString
		.call(data)
		.match(/\s([a-zA-Z]+)/)[1]
		.toLowerCase()
}
/**
 * @param {*} data 过滤掉null的数据
 */
const filterNull = data => {
	if (toType(data) !== 'object') {
		return data !== null ? '' : data
	} else if (toType(data) === 'object') {
		Object.keys(data).map(key => {
			if (data[key] == null) {
				data[key] = ''
			} else if (toType(data[key]) === 'string') {
				data[key] = data[key].trim()
			} else if (toType(data[key]) === 'object') {
				data[key] = filterNull(data[key])
			} else if (toType(data[key]) === 'array') {
				data[key].forEach(item => {
					filterNull(item)
				})
			}
		})
	} else if (toType(data) === 'array') {
		data.forEach(item => {
			filterNull(item)
		})
	}
	return data
}
/**
 * 对象深拷贝
 * @param {*} data 要拷贝的对象
 */
const data = [
	{
		name: 'dfasfdas',
		ages: [12, 2, 45, 54],
		fons: {
			sex: 'nan'
		}
	},
	'21232'
]
function deepClone(source) {
	var target
	if (typeof source === 'object') {
		target = Array.isArray(source) ? [] : {}
		for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				if (typeof source[key] !== 'object') {
					target[key] = source[key]
				} else {
					target[key] = deepClone(source[key])
				}
			}
		}
	} else {
		target = source
	}
	return target
}
const res = deepClone(data)
console.log('res', res)

export default {
	toType,
	filterNull,
	deepClone
}
