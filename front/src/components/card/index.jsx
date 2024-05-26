import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

function BasicCard({ id, photo, title, price, stock }) {
	return (
		<Card sx={{ id, width: 250, height: 300 }}>
			<div>
				<Typography level="title-lg">{title}</Typography>
				<Typography level="body-sm">Stock: {stock}</Typography>
			</div>
			<AspectRatio minHeight="120px" maxHeight="200px">
				<img
					src={photo}
					loading="lazy"
					alt=""
				/>
			</AspectRatio>
			<CardContent orientation="horizontal">
				<div>
					<Typography level="body-xs">Precio:</Typography>
					<Typography fontSize="lg" fontWeight="lg">
						${price}
					</Typography>
				</div>
				<Button
					variant="solid"
					size="md"
					color="primary"
					aria-label="Explore Bahamas Islands"
					sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
				>
					Agregar
				</Button>
			</CardContent>
		</Card>
	);
}

export default BasicCard
