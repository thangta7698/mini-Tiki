const toSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, '') //trim
  str = str.toLowerCase()

  const from = "aáàảạãẳắặằẵâấầậẩẫeèéẻẹẽêếềễểệiíỉịĩìyỳỹỷỵýuùúủụũưứừửựũoóòỏọõôốồổộỗơớờởợõđ /_,:;"
  const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiyyyyyyuuuuuuuuuuuuooooooooooooooooood------"

  for (let i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

module.exports = toSlug