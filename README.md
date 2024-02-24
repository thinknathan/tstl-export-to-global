# tstl-export-to-global

[![CI](https://github.com/thinknathan/tstl-export-to-global/actions/workflows/ci.yml/badge.svg)](https://github.com/thinknathan/tstl-export-to-global/actions/workflows/ci.yml)

TypeScriptToLua plugin that transforms all exported variables in a given file to global declarations.

Can be used as an alternative to [tstl-export-as-global](https://github.com/ts-defold/tstl-export-as-global). The benefits from switching to this plugin are as follows:

1. Saves allocating one table
2. Allows you to use `export const FOO = function()` instead of `export function FOO()` if you prefer that syntax
3. All variables are transformed, not just functions

:exclamation: Use this and any code transformation plugin with caution. Mistakes are possible.

## Example

```lua
local ____exports = {}
____exports.foo = 10
____exports.bar = function(self)
	...
end
return ____exports
```

Becomes:

```lua
foo = 10
function bar(self)
	...
end
```

## Installation

Requires TSTL >= 1.22.0.

1. Install this plugin

```bash
yarn add tstl-export-to-global -D
# or
npm install tstl-export-to-global --save-dev
```

2. Add `tstl-export-to-global` to `tstl.luaPlugins` in `tsconfig.json`

3. Define `match`, which will only apply the transformation to files if their _input_ (TypeScript file) path matches.

```diff
{
	"tstl": {
		"luaPlugins": [
+			{
+				"name": "tstl-export-to-global",
+				"match": ".*\\..*script.ts$"
+			}
		],
	}
}
```

## License

CC0
