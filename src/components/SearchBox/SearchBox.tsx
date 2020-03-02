import React from 'react';
import {TextInput} from 'react-native-paper';
import {StyleProp, TouchableHighlight, View, ViewStyle} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import styles from './SearchBox.sass';

interface Props {
    value: string;
    placeholder?: string;
    onChangeText?: (text: string) => void;
}

const SearchBox: React.FC<Props> = ({value, placeholder, onChangeText}) => {
    return (
        <View style={styles.search as StyleProp<ViewStyle>}>
            <View style={styles.searchInput as StyleProp<ViewStyle>}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                />
            </View>
            <TouchableHighlight onPress={() => onChangeText && onChangeText('')}>
                <FontAwesomeIcon size={35} icon={faTimes}/>
            </TouchableHighlight>
        </View>
    );
};

export default SearchBox;
