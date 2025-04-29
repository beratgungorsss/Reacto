import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showPercentage = false,
  color = colors.primary,
  backgroundColor = colors.border,
  style,
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.progressContainer, 
          { 
            height, 
            backgroundColor,
            borderRadius: height / 2,
          }
        ]}
      >
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${clampedProgress}%`, 
              height, 
              backgroundColor: color,
              borderRadius: height / 2,
            }
          ]} 
        />
      </View>
      
      {showPercentage && (
        <Text style={styles.percentageText}>
          {Math.round(clampedProgress)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  percentageText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },
});