import type { Program } from 'typescript';
import * as tstl from 'typescript-to-lua';

interface PluginOptions {
	name: string;
	match: string;
}

/**
 * Plugin definition for TypeScript-to-Lua
 */
const plugin = (options: PluginOptions): tstl.Plugin => {
	return {
		afterEmit: (
			_program: Program,
			_options: tstl.CompilerOptions,
			emitHost: tstl.EmitHost,
			result: tstl.EmitFile[],
		) => {
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

const transformExportFunctions = (file: tstl.EmitFile): void => {
	// Replace instances of "____exports.ANYTHING = function(" with "function ANYTHING("
	file.code = file.code.replace(
		/____exports\.(\w+)\s*=\s*function\s*\(/g,
		'function $1(',
	);
};

const removeExports = (file: tstl.EmitFile): void => {
	// Remove instances of "____exports."
	file.code = file.code.replace(/____exports\./g, '');
	// Remove one instance of "local ____exports = {}"
	file.code = file.code.replace(/local ____exports\s*=\s*{\s*}/, '');
	// Remove one instance of "return ____exports"
	file.code = file.code.replace(/return ____exports/, '');
};

// Export the plugin for use in TypeScript-to-Lua
export default plugin;
