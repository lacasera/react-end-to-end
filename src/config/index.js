const envs = process.env
module.exports = key => {
    if (envs[key] === undefined) {
        throw new Error(`No config for env variable ${key}`)
    }
    return envs[key]
}