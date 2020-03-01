import React from 'react';
import {TextInput} from 'react-native-paper';
import {TouchableHighlight, View} from 'react-native';
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
        <View style={styles.search}>
            <View style={styles.searchInput}>
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
