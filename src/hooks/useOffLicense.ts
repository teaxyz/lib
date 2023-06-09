import { Stowage } from "../types.ts"
import host from "../utils/host.ts"
import Path from "../utils/Path.ts"

type Type = 's3'

export default function useOffLicense(_type: Type) {
  return { url, key }
}

function key(stowage: Stowage) {
  let rv = Path.root.join(stowage.pkg.project)
  if (stowage.type == 'bottle') {
    const { platform, arch } = stowage.host ?? host()
    rv = rv.join(`${platform}/${arch}`)
  }
  let fn = `v${stowage.pkg.version}`
  if (stowage.type == 'bottle') {
    fn += `.tar.${stowage.compression}`
  } else {
    fn +=  stowage.extname
  }
  return rv.join(fn).string.slice(1)
}

function url(stowage: Stowage) {
  return new URL(`https://dist.tea.xyz/${key(stowage)}`)
}
