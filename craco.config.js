module.exports = {
	webpack: {
		configure: (webpackConfig, {env, paths}) => {
			const newRules = Object.assign({}, webpackConfig.module.rules.find(rule => rule.oneOf))
			const babelRule = newRules.oneOf.find(rule => rule.loader.includes('babel-loader'))
			// 컴파일할 라이브러리를 추가하도록 exclude 프로퍼티에 정규표현식을 추가
			babelRule.exclude = /[\\/]node_modules[\\/](?!(@testing-library\/react|@testing-library\/user-event)[\\/])/
			const otherRules = webpackConfig.module.rules.filter(rule => !rule.oneOf)

			return {
				...webpackConfig,
				module: {
					...webpackConfig.module,
					rules: [
						...otherRules,
						newRules
					],
				}
			}
		}
	},
};
