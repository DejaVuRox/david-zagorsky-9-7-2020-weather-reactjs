import React, {FC} from 'react';
import {connect} from 'react-redux'
import {getAutoComplete, searchCity, setTempUnit} from "../../store/actions/weatherActions";
import {Input, AutoComplete, Switch, Row, Col} from '../antd/antd'
import robot from '../../assets/lottie/robot-bot-3d.json'
import Lottie from "react-lottie";
import './Search.css'
import {resetCheckbox} from "../../store/actions/userActions";

interface IProps {
    searchCity: (input: string) => void
    resetCheckbox: () => void
    getAutoComplete: (input: string) => void
    autoComplete: { value: string }[]
    setTempUnit: (isMetric: boolean) => void
}

const Search: FC<IProps> = ({getAutoComplete, autoComplete, searchCity, setTempUnit, resetCheckbox}) => {

    let defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: robot,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div>
            <Row align={'middle'}>
                <Lottie height={200} width={200} options={defaultOptions}/>
                <Col>
                    <Row>
                        <AutoComplete
                            dropdownMatchSelectWidth={252}
                            style={{width: 300}}
                            options={autoComplete}
                            onSelect={(value) => {
                                searchCity(value)
                                resetCheckbox()
                            }}
                        >
                            <Input.Search
                                size="large"
                                placeholder="Search City..."
                                enterButton
                                onChange={(event) => getAutoComplete(event.target.value)}
                            />
                        </AutoComplete>
                    </Row>

                    <Row className={'switch'}>
                        <Switch
                            checkedChildren="°​C"
                            unCheckedChildren="°F"
                            defaultChecked
                            onChange={(checked) => setTempUnit(checked)}
                        />
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    autoComplete: state.weather.autoCompleteResults,
})

export default connect(mapStateToProps, {getAutoComplete, searchCity, setTempUnit, resetCheckbox})(Search)
