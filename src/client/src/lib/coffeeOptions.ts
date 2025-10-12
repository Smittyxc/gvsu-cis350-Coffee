
export type Option = {
  value: string
  label: string
}


export const coffeeProducingCountries: Option[] = [
  { value: "brazil", label: "Brazil" },
  { value: "vietnam", label: "Vietnam" },
  { value: "colombia", label: "Colombia" },
  { value: "indonesia", label: "Indonesia" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "honduras", label: "Honduras" },
  { value: "india", label: "India" },
  { value: "uganda", label: "Uganda" },
  { value: "mexico", label: "Mexico" },
  { value: "guatemala", label: "Guatemala" },
  { value: "peru", label: "Peru" },
  { value: "nicaragua", label: "Nicaragua" },
  { value: "china", label: "China" },
  { value: "ivory-coast", label: "Ivory Coast" },
  { value: "costa-rica", label: "Costa Rica" },
  { value: "kenya", label: "Kenya" },
  { value: "tanzania", label: "Tanzania" },
  { value: "el-salvador", label: "El Salvador" },
  { value: "ecuador", label: "Ecuador" },
  { value: "cameroon", label: "Cameroon" },
  { value: "laos", label: "Laos" },
  { value: "madagascar", label: "Madagascar" },
  { value: "gabon", label: "Gabon" },
  { value: "thailand", label: "Thailand" },
  { value: "venezuela", label: "Venezuela" },
  { value: "dominican-republic", label: "Dominican Republic" },
  { value: "haiti", label: "Haiti" },
  { value: "democratic-republic-of-congo", label: "Democratic Republic of Congo" },
  { value: "rwanda", label: "Rwanda" },
  { value: "burundi", label: "Burundi" },
  { value: "philippines", label: "Philippines" },
  { value: "togo", label: "Togo" },
  { value: "guinea", label: "Guinea" },
  { value: "yemen", label: "Yemen" },
  { value: "cuba", label: "Cuba" },
  { value: "panama", label: "Panama" },
  { value: "bolivia", label: "Bolivia" },
  { value: "jamaica", label: "Jamaica" },
  { value: "puerto-rico", label: "Puerto Rico" },
  { value: "papua-new-guinea", label: "Papua New Guinea" },
  { value: "zimbabwe", label: "Zimbabwe" },
  { value: "hawaii", label: "Hawaii" },
]

export const varieties = [
  { value: "gesha", label: "Gesha" },
  { value: "pacamara", label: "Pacamara" },
  { value: "maragogipe", label: "Maragogipe" },
  { value: "sl-28", label: "SL-28" },
  { value: "sl-34", label: "SL-34" },
  { value: "bourbon", label: "Bourbon" },
  { value: "pink-bourbon", label: "Pink Bourbon" },
  { value: "typica", label: "Typica" },
  { value: "caturra", label: "Caturra" },
  { value: "catuai", label: "Catuai" },
  { value: "ethiopian-heirloom", label: "Ethiopian Heirloom" },
  { value: "pacas", label: "Pacas" },
  { value: "mundo-novo", label: "Mundo Novo" },
  { value: "villa-sarchi", label: "Villa Sarchi" },
  { value: "ihcafe-90", label: "IHCAFE 90" },
  { value: "lempira", label: "Lempira" },
  { value: "parainema", label: "Parainema" },
  { value: "catimor", label: "Catimor" },
  { value: "sarchimor", label: "Sarchimor" },
  { value: "rume-sudan", label: "Rume Sudan" },
  { value: "javanica", label: "Javanica" },
  { value: "k7", label: "K7" },
  { value: "batian", label: "Batian" },
  { value: "obata", label: "Obatã" },
  { value: "tupi", label: "Tupi" },
  { value: "colombia", label: "Colombia" },
  { value: "castillo", label: "Castillo" },
  { value: "anacafe-14", label: "Anacafé 14" },
  { value: "bourbon-pointu", label: "Bourbon Pointu" },
  { value: "liberica", label: "Liberica" },
  { value: "excelsa", label: "Excelsa" },
];


export function getLabelFromValue(options: Option[], value?: string): string {
  if (!value) return "Unknown"
  return options.find((o) => o.value === value)?.label ?? value
}

// export function getValueFromLabel(options: Option[], label?: string): string {
//   if (!label) return ""
//   return options.find((o) => o.label === label)?.value ?? label.toLowerCase()
// }
