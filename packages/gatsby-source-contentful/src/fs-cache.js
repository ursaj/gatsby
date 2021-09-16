import fs from "fs-extra"

export async function getFileSystemCachePath({ suffix = null } = {}) {
  if (!process.env.GATSBY_CONTENTFUL_EXPERIMENTAL_FORCE_CACHE) {
    return {
      fsForceCache: false,
      fsCacheFileExists: false,
      fsCacheFilePath: null,
    }
  }

  const fsCacheFilePath = [
    process.env.GATSBY_CONTENTFUL_EXPERIMENTAL_FORCE_CACHE,
    suffix,
  ]
    .filter(Boolean)
    .join(`-`)

  let fsCacheFileExists
  try {
    await fs.access(process.env.GATSBY_CONTENTFUL_EXPERIMENTAL_FORCE_CACHE)
    fsCacheFileExists = true
  } catch (e) {
    fsCacheFileExists = false
  }

  return {
    fsForceCache: true,
    fsCacheFileExists,
    fsCacheFilePath,
  }
}
