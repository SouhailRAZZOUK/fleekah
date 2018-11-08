import React, { PureComponent } from "react";
import * as Sentry from '@sentry/browser';
import { Grid, Row, Cell } from "@material/react-layout-grid";
import ColorSelect from "./ColorSelect";
import ImagesSearchResults from "./ImagesSearchResults";
import SnackBar from "../SnackBar";
import { oneTime } from "../../utils";

class SearchByColors extends PureComponent {

    constructor(props) {
        super(props);

        this._handleColorSelectionChange = this._handleColorSelectionChange.bind(this);
        this.state = {
            searchColors: {}
        }
    }

    componentDidMount() {
        let { fetchAvilableColors, fetchSearchResults } = this.props;
        let { searchColors } = this.state;
        this.setState({
            ...this.state,
            once: oneTime() // this is a hack because of the cranky way react-redux-alerts work
        });
        fetchAvilableColors && fetchAvilableColors();
        fetchSearchResults && fetchSearchResults(searchColors);
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    componentDidUpdate() {
        let { alerts, error } = this.props;
        let { once } = this.state;
        if (error && once.next().value) {
            alerts.createAlert("snackBar", `Couldn't load search results \n [${error}]`)
        }
    }

    _handleColorSelectionChange(selectedColor, itemsKey) {
        let { fetchSearchResults } = this.props;
        let colorArray = selectedColor.value.substring(4, selectedColor.value.length - 1)
            .replace(/ /g, '')
            .split(',');
        let { searchColors } = this.state;
        let searchedColors = {
            ...searchColors,
            [itemsKey]: colorArray
        };
        this.setState({
            searchColors: {
                [itemsKey]: colorArray
            }
        });
        fetchSearchResults && fetchSearchResults(searchedColors);
    }

    _arrayToColor(color) {
        let [r, g, b] = color;
        return {
            key: "color",
            value: `rgb(${r},${g},${b})`,
            selected: false
        };
    }

    _reMapAvailableColors(colors) {
        let { _arrayToColor: arrayToColor } = this;
        return colors ? colors.map(arrayToColor) : [];
    }

    render() {

        let { alerts, data, availableColors } = this.props;
        let { vibrants, muted } = availableColors;

        vibrants = this._reMapAvailableColors(vibrants);
        muted = this._reMapAvailableColors(muted);

        return <div>
            <SnackBar />
            <Grid>
                <Row>
                    <Cell desktopColumns={12} tabletColumns={8} phoneColumns={4}>
                        <p> Please Select a Vibrant and a muted color to search for:</p>
                    </Cell>
                </Row>
                <Row>
                    <Cell desktopColumns={6} tabletColumns={4} phoneColumns={4}>
                        <ColorSelect title="Select Vibrant color" itemsKey="vibrant" colors={vibrants} onChange={this._handleColorSelectionChange} alerts={alerts} />
                    </Cell>
                    <Cell desktopColumns={6} tabletColumns={4} phoneColumns={4}>
                        <ColorSelect title="Select Muted color" itemsKey="muted" colors={muted} onChange={this._handleColorSelectionChange} alerts={alerts} />
                    </Cell>
                </Row>
            </Grid>

            <ImagesSearchResults data={data} lazy={false} withLink={true} />

        </div>
    }

}

export default SearchByColors;