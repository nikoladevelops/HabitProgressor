import { useCallback, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Unique Id for the notification
const remindHabitsId = "remindHabitsCompletion"

const storageKey = "notificationsEnabled"

// When a notification is received successfully, schedule another one for midnight.
const notificationReceived = async (notifId)=>{
  if (notifId === remindHabitsId) {
    try {
      await scheduleNotification();
    } catch (err) {
      console.log(err)
    }
  }
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
    handleSuccess:notificationReceived,
    handleError: (err)=>console.log(err)
  });

export const usePushNotifications = ()=>{
    const [areEnabled, setEnabled] = useState(false)

    useEffect(()=>{
      const setEnabledInitialState = async()=>{
        try {
          const areNotifsEnabledString = await AsyncStorage.getItem(storageKey)
          const areNotifsEnabledBool = areNotifsEnabledString === "true"
          
          // Just in case the scheduled notifications got removed somehow and the storage doesn't match that, check if there really are any scheduled notifications according to the device.
          const areScheduled = (await Notifications.getAllScheduledNotificationsAsync()).length > 0
          
          setEnabled(areNotifsEnabledBool && areScheduled)
        } catch (err) {
         console.log(err) 
        }
      }

      setEnabledInitialState()
    },[])

    const setAreEnabled = useCallback(async(value)=>{
      try {
        if (value){
          const isSuccessful = await enableNotifications()
          
          if(!isSuccessful){
            alert("You have to enable notification permissions for the app in Settings.")
            return;
          }
        }else{
          await disableNotifications()
        }
  
        await AsyncStorage.setItem(storageKey, value.toString())
        setEnabled(value)
      } catch (err) {
        console.log(err)
      }
    },[])

    return {areEnabled, setAreEnabled}
}

const enableNotifications = async ()=>{
    const arePermissionsGranted = await grantPermissions()

    if(arePermissionsGranted){
      await scheduleNotification()
    }
    return arePermissionsGranted
}

const disableNotifications = async()=>{
  await Notifications.cancelAllScheduledNotificationsAsync()
}

const grantPermissions = async ()=>{
    const {status:requestStatus} = await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
            allowProvisional: true
        },
        android: {
            channelId: 'default',
            vibrate: true,
            playSound: true,
        }
    })
    
    return requestStatus === "granted"
}

const scheduleNotification = async () => {
    const notificationContent = {
      title: "Don't forget to do your habits!",
      body: 'You can start completing your daily habits right now.',
    };
  
    const trigger = {
      seconds: getTimeUntilTommorowInSeconds(), 
    };
  
    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger,
      identifier:remindHabitsId
    });
  };

const getTimeUntilTommorowInSeconds = ()=>{
  const dateTommorow = new Date()
  dateTommorow.setDate(dateTommorow.getDate()+1)
  dateTommorow.setHours(0,0,0,0)

  return (dateTommorow.getTime() - new Date().getTime()) / 1000
}