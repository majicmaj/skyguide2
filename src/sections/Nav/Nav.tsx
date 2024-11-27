import { Box } from '@mui/system'

interface INavProps {
	data: any
}

const Nav = ({ data }: INavProps) => {
	const { results } = data || {};
	const first = results && results[0];
	const { address_components } = first || {};
	
	// Helper function to find a specific type in address_components
	const findComponent = (type: string) => 
			address_components && address_components.find((c: any) => c.types.includes(type));
	
	const isLoading = !results || !address_components;

	// Extract city, statecode, and countryCode
	const locality = findComponent('locality'); // City
	const state = findComponent('administrative_area_level_1'); // State code
	const country = findComponent('country'); // Country code
	
	const city = locality ? locality.long_name : null;
	const stateCode = state ? state.short_name : null; // Use short_name for state codes
	const countryCode = country ? country.short_name : null; // Use short_name for country codes
	
	// Format location based on US or non-US
	const location = 
	isLoading ? '...' : 
	countryCode === 'US'
			? `${city}, ${stateCode}` // City, StateCode for US
			: `${city}, ${countryCode}`; // City, CountryCode for non-US
	
	return (
		<Box
			sx={{
				'@media screen and (min-width: 768px)': {
					gridArea: 'n',
				},
				display: 'grid',
				marginY: '0.75rem',
				placeItems: 'center',
			}}
		>
			<p
				style={{
					fontSize: '1em',
					textAlign: 'center',
					textTransform: 'none',
					filter: 'drop-shadow(0 0 2px #0004)',
					fontWeight: 'bold'
				}}
			>
				{location}
			</p>
		</Box>
	)
}

export default Nav
