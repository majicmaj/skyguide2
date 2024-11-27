export const SCREEN_SIZES = {
	xs: '(max-width: 320px)',
	lg: '(min-width: 768px)',
}

export const MEDIA = {
	xs: `@media screen and  ${SCREEN_SIZES.xs}`,
	lg: `@media screen and  ${SCREEN_SIZES.lg}`,
}

 
export const GRID_AREAS = {
	def: `
	"n n"
	"c c"
	"h s"
	"d d"
	`,
	willPreciptate: `
	"n n"
	"c c"
	"m m"
	"h s"
	"d d"
	`,
	alerts: `
	"n n"
	"c c"
	"a a"
	"h s"
	"d d"
	`,
	both: `
	"n n"
	"c c"
	"a a"
	"m m"
	"h s"
	"d d"
	`,
}
