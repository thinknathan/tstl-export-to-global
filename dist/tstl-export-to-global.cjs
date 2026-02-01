'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
/**
 * Plugin definition for TypeScript-to-Lua
 */
const plugin = (options) => {
	return {
		afterEmit: (_program, _options, emitHost, result) => {
			if (!options.match) {
				console.warn(
					'`tstl-export-to-global` is missing `match` in `tsconfig`',
				);
				return;
			}
			for (const file of result) {
				const matchesFile = new RegExp(options.match);
				if (
					file.sourceFiles &&
					matchesFile.test(file.sourceFiles[0].fileName)
				) {
					transformExportFunctions(file);
					removeExports(file);
					emitHost.writeFile(file.outputPath, file.code, false);
				}
			}
		},
	};
};
const transformExportFunctions = (file) => {
	// Replace instances of "____exports.ANYTHING = function(" with "function ANYTHING("
	file.code = file.code.replace(
		/____exports\.(\w+)\s*=\s*function\s*\(/g,
		'function $1(',
	);
};
const removeExports = (file) => {
	// Remove instances of "____exports."
	file.code = file.code.replace(/____exports\./g, '');
	// Remove one instance of "local ____exports = {}"
	file.code = file.code.replace(/local ____exports\s*=\s*{\s*}/, '');
	// Remove one instance of "return ____exports"
	file.code = file.code.replace(/return ____exports/, '');
};
// Export the plugin for use in TypeScript-to-Lua
exports.default = plugin;
