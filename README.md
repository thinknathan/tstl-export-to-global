# tstl-export-to-global

TypeScriptToLua plugin that transforms all exported variables in a given file to global declarations.

Can be used as an alternative to [tstl-export-as-global](https://github.com/ts-defold/tstl-export-as-global). The benefits from switching to this plugin are as follows:

1. Saves allocating one table
2. Allows you to use `export FOO = function()` instead of `export function FOO()` if you prefer that syntax
3. All variables are transformed, not just functions

## Example

```lua
local ____exports = {}
____exports.init = function(self)
	...
end
return ____exports
```

Becomes:

```lua
function init(self)
	...
end
```

## Installation

Requires TSTL >= 1.22.0.

1. Install this plugin

```bash
yarn add git+https://git@github.com/thinknathan/tstl-export-to-global.git#^1.0.0 -D
# or
npm install git+https://git@github.com/thinknathan/tstl-export-to-global.git#^1.0.0 --save-dev
```

2. Add `tstl-export-to-global` to `tstl.luaPlugins` in `tsconfig.json`

3. Define `match`, which will only apply the transformation to files if their path matches.

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
