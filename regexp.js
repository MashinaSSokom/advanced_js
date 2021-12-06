let replacer = function (str) {
    const regexp = /((\s|\w)?'([^t]|$))/g
    return  str.replace(regexp, `$2"$3`)
}

console.log(replacer(`Someone said: 'Don't be stupid!'`))
