import type { Config } from 'jest';

const config: Config = {
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	moduleNameMapper: {
		'^@components(.*)$': '<rootDir>/src/components$1',
		'^@hooks(.*)$': '<rootDir>/src/hooks$1',
		'^@images/(.*)$': '<rootDir>/src/image/$1',
		'^@pages$': '<rootDir>/src/pages',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
		'^@api$': '<rootDir>/src/utils/burger-api.ts',
		'^@utils-types$': '<rootDir>/src/utils/types.ts',
		'^@slices$': '<rootDir>/src/services/slices/$1',
		'^@selectors$': '<rootDir>/src/services/selectors/$1',
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
	}
};

export default config;
