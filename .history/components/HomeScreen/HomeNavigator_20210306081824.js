const HomeNavigator = () => {

    return( <Stack.Navigator initialRouteName="home">
    <Stack.Screen name="action" component={Action} />
    {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
  </Stack.Navigator>)
}

export default HomeNavigator