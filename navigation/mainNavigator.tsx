import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { TransitionSpecs } from "@react-navigation/stack";
import React from "react";

// Screens
import WelcomeScreen from "../screens/welcomeScreen";
import HomeScreen from '../screens/homeScreen';

const MainNavigator = () => {

    const Stack = createStackNavigator()
    const { Navigator, Screen } = Stack

    return (
        <Navigator mode="card" headerMode="screen" >
            <Screen name="welcome" component={WelcomeScreen} options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
            <Screen name="home" component={HomeScreen} options={{
                title: 'Search Pokemon',
                headerStyle: {
                    backgroundColor: '#0a369d',
                    height: 100
                },
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} />
        </Navigator>
    )

}

export default MainNavigator