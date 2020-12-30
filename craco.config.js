module.exports = {
	webpack: {
		configure: (webpackConfig, {env, paths}) => {
			const newRules = Object.assign({}, webpackConfig.module.rules.find(rule => rule.oneOf))
			const babelRule = newRules.oneOf.find(rule => rule.loader.includes('babel-loader'))
			// node_modules 하위의 라이브러리 중에 es5를 지원하지 않는 부류를 필터한다
			// babel은 그것을 다시 한번 컴파일하게 된다.
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
