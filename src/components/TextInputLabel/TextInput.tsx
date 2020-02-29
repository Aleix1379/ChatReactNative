import React from 'react';
import {StyleProp, View, ViewStyle, TextInput, Text} from 'react-native';

interface Props {
  label?: string;
  value: string;
  onChangeText?: (text: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

const InputTextLabel: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  multiline,
  placeholder,
}) => {
  const getInputStyle = (): StyleProp<ViewStyle> => {
    const inputStyle = {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,

      backgroundColor: '#fff',
      width: '100%',
      marginTop: 8,
      marginBottom: 8,
      height: 40,
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 3,
      textAlignVertical: 'center',
    };

    if (multiline) {
      inputStyle.height = 150;
      inputStyle.textAlignVertical = 'top';
    }

    return inputStyle;
  };

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={getInputStyle()}
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputTextLabel;
