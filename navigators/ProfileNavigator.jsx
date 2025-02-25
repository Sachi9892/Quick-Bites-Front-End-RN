import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyRatings from "../screens/profile/Ratings";
import MyAddresses from "../screens/profile/Addresses";
import OrderHistory from "../screens/profile/OrderHistory";
import LogoutScreen from "../screens/profile/LogoutScreen";

const Drawer = createDrawerNavigator();

export default function ProfileDrawerNavigation() {
    
    return (

        <Drawer.Navigator
            options={{
                drawerActiveTintColor: "gold",
                drawerActiveBackgroundColor: "black",
            }}>

            <Drawer.Screen name="Ratings" component={MyRatings} />
            <Drawer.Screen name="Orders" component={OrderHistory} />
            <Drawer.Screen name="Addresses" component={MyAddresses} />
            <Drawer.Screen name="Logout" component={LogoutScreen} />
        </Drawer.Navigator>

    );
}
