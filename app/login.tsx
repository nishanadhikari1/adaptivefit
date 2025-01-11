import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import {login} from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/globalProvider';
import { Redirect } from 'expo-router';
import { getCurrentUser } from '@/lib/appwrite';

const LoginScreen = () => {
    const {refetchUser, loading, isLogged}  = useGlobalContext();

    if(!loading && isLogged) return <Redirect href = "/" />; //dont know about this

    const heroImage = require('../assets/images/hero2.jpeg');
    const icon = require('../assets/images/favicon.png');
        const theme = {
            ...DefaultTheme,
            // Specify custom property in nested object
    
            colors: {
                ...DefaultTheme.colors,
                primary: '#198BEF',
                secondary: '#070D81',
                text: '#000000',
                background: '#FFFFFF',
            },
        };

        const handleLogin = async () => {
            try{
                const result = await login();
                if (result) {
                    await refetchUser();
                    Alert.alert("Successfully logged in");
                }
            }catch(error){
                console.error(error);
                Alert.alert("Error", "Failed to login");
            }
        };

    return (
        <PaperProvider>
            <View className="flex-1 relative bg-[#3D3B40]">
                <Image
                    source={heroImage}
                    className="absolute inset-0 w-full h-full"
                    style={{ resizeMode: 'cover', zIndex: 1 }}
                />
                {/* Content */}
                <View className="flex-1 justify-center p-4 mt-80 z-[2]">
                    {/* Text Content */}
                        <View className='flex-row items-center justify-around'>
                            <Text className="text-white text-3xl font-bold mb-2 ">"Move{'\n'} Beyond{'\n'} Barriers"</Text>
                            <View className="w-24 h-24">
                            <Image
                                source={icon}
                                className="w-full h-full"
                                style={{ resizeMode: 'contain', zIndex: 1 }}
                            />
                        </View>
                        </View>
                        <Text className="text-white text-center text-lg font-medium my-8 italic">
                        Discover tailored workouts, personalized guidance, and a community that celebrates every step of your fitness journey
                        </Text>
                 
                        <Button
                            icon="google"
                            mode="contained"
                            onPress={handleLogin}
                            style={{ margin: 20, backgroundColor: '#198BEF' }}
                        >
                            Sign in with Google
                        </Button>
                </View>
            </View>
        </PaperProvider>
    );
};

export default LoginScreen;
