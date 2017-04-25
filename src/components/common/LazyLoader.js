import React from 'react';
import {
    LazyloadScrollView,
    LazyloadView
} from 'react-native-lazyload';

const LazyLoadView = (props) => {
    <LazyloadScrollView>
        <LazyloadView>
            {props.children}
        </LazyloadView>
    </LazyloadScrollView>
}

export default LazyLoadView;