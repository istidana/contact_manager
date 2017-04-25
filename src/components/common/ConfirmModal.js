import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const ConfirmDelete = (props) =>{
    return(
        <Modal
            transparent
            animationType="slide"
            onRequestClose={()=>{}}
            visible={props.visible}
        >
            <View style={styles.containerStyle}>
                <CardSection style={styles.cardSectionStyle}>
                    <Text style={styles.textStyle}>
                        {props.children}
                    </Text>
                </CardSection>

                <CardSection>
                    <Button onPress={props.onAccept }>Yes</Button>
                    <Button onPress={props.onCancel}>Cancel</Button>
                </CardSection>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    cardSectionStyle: {
        justifyContent: 'center',
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle:{
         backgroundColor: 'rgba(0,0,0,0.75)',
         position: 'relative',
         flex: 1,
         justifyContent: 'center'
    }
});

export { ConfirmDelete };