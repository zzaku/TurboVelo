import {Footer, Text, Anchor} from 'grommet'
import './Styles/Reservation.css'

const Reservation = ({connected}) => {
    return ( 
        <div>{connected.connected ?
            <h1>Bonjour M. {connected.nom + ' ' + connected.prenom}</h1>
            :
            <h1>Bonjour, vous pouvez vous inscrire</h1>
        }

            <Footer background="brand" pad="medium">
            <Text>Copyright</Text>
            <Anchor label="About" />
            </Footer>
        </div>
     );
}
 
export default Reservation;