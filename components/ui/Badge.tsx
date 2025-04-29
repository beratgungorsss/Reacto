import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  const getBadgeStyle = () => {
    let badgeStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        badgeStyle = {
          backgroundColor: colors.primary,
        };
        break;
      case 'secondary':
        badgeStyle = {
          backgroundColor: colors.secondary,
        };
        break;
      case 'success':
        badgeStyle = {
          backgroundColor: colors.success,
        };
        break;
      case 'error':
        badgeStyle = {
          backgroundColor: colors.error,
        };
        break;
      case 'warning':
        badgeStyle = {
          backgroundColor: colors.warning,
        };
        break;
      case 'info':
        badgeStyle = {
          backgroundColor: colors.info,
        };
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        badgeStyle = {
          ...badgeStyle,
          paddingVertical: 2,
          paddingHorizontal: 6,
          borderRadius: 4,
        };
        break;
      case 'medium':
        badgeStyle = {
          ...badgeStyle,
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: 6,
        };
        break;
      case 'large':
        badgeStyle = {
          ...badgeStyle,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 8,
        };
        break;
    }
    
    return badgeStyle;
  };
  
  const getTextStyle = () => {
    let textStyleObj: TextStyle = { 
      color: '#fff',
      fontWeight: '500',
    };
    
    switch (size) {
      case 'small':
        textStyleObj = {
          ...textStyleObj,
          fontSize: 10,
        };
        break;
      case 'medium':
        textStyleObj = {
          ...textStyleObj,
          fontSize: 12,
        };
        break;
      case 'large':
        textStyleObj = {
          ...textStyleObj,
          fontSize: 14,
        };
        break;
    }
    
    return textStyleObj;
  };
  
  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      <Text style={[getTextStyle(), textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
});