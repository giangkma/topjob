import { ForgotPasswordScreen, LoginScreen, SignupScreen } from 'screens/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, List, Message, Person } from 'assets';
import { Colors } from 'assets/Colors';
import { useAuth } from 'hooks';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import SplashScreen from 'react-native-splash-screen';
import {
    ApplicationsScreen,
    CreateVacancyScreen,
    HomeScreen,
    ProfileScreen,
} from 'screens/main';
import { navigationRef } from './utils';
import { StartupScreen } from 'screens/startup/StartupScreen';

const Stack = createStackNavigator();
const Tabs = AnimatedTabBarNavigator();
// @refresh reset
export const ApplicationNavigator = () => {
    const { isLogged } = useAuth();
    console.disableYellowBox = true;
    useEffect(() => {
        SplashScreen.hide();
    });
    const isProfileSetupDone = true;

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="light-content" />
            {isLogged ? (
                !isProfileSetupDone ? (
                    <Stack.Navigator
                        initialRouteName={'StartUpScreen'}
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen
                            name="StartUpScreen"
                            component={StartupScreen}
                        />
                    </Stack.Navigator>
                ) : (
                    <>
                        <Stack.Navigator
                            initialRouteName={'CreateVacancy'}
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen
                                name="CreateVacancy"
                                component={CreateVacancyScreen}
                            />
                            <Stack.Screen
                                name="MainTabs"
                                component={MainTabs}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </>
                )
            ) : (
                <Stack.Navigator
                    initialRouteName={'Login'}
                    screenOptions={{ headerShown: false }}
                >
                    <React.Fragment>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPasswordScreen}
                        />
                    </React.Fragment>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

const MainTabs = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: Colors.primary,
                activeBackgroundColor: Colors.aliceBlue,
                tabStyle: {
                    borderRadius: 15,
                },
            }}
            appearance={{
                floating: true,
                shadow: false,
            }}
        >
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <Home />,
                }}
            />
            <Tabs.Screen
                name="Aplications"
                component={ApplicationsScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <List />,
                }}
            />
            <Tabs.Screen
                name="Chat"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <Message />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <Person />,
                }}
            />
        </Tabs.Navigator>
    );
};