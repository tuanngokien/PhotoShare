import React from "react";
import Gallery from "react-photo-gallery";
/* popout the browser and maximize to see more rows! -> */

const photos = [
    {
        src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
        width: 1,
        height: 1
    },
    {
        src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
        width: 3,
        height: 4
    },
    {
        src: "https://source.unsplash.com/PpOHJezOalU/800x599",
        width: 4,
        height: 3
    },
    {
        src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
        width: 4,
        height: 3
    }
];

var Photo = function Photo(_ref) {
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

    var imgWithClick = { cursor: 'pointer' };

    var index = _ref.index,
        onClick = _ref.onClick,
        photo = _ref.photo,
        margin = _ref.margin,
        direction = _ref.direction,
        top = _ref.top,
        left = _ref.left;

    var imgStyle = {margin: margin};
    if (direction === 'column') {
        imgStyle.position = 'absolute';
        imgStyle.left = left;
        imgStyle.top = top;
    }

    var handleClick = function handleClick(event) {
        onClick(event, {photo: photo, index: index});
    };

    return React.createElement('img', _extends({
        style: onClick ? _extends({}, imgStyle, imgWithClick) : imgStyle
    }, photo, {
        onClick: onClick ? handleClick : null
    }));
};

export default class imageLayout extends React.Component {
    render() {
        return <Gallery ImageComponent={Photo} photos={photos}/>;
    }
}
