export default function ColoredPop({ pop }: { pop: number }) {
	return (
		<div
			style={{
				color: '#0af',
				filter: `saturate(${pop})`,
			}}
		>
			{Math.round(pop * 100)}%
		</div>
	)
}
