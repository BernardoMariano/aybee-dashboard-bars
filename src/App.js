import React from 'react'
import styled from 'styled-components'
import { Grid, Row, Col } from 'react-bootstrap'
import experiments from './experiments.json'
import { mix } from 'polished'
import shuffle from 'lodash.shuffle'

const getRandomColor = () =>
  '#' +
  Math.random()
    .toString(16)
    .slice(2, 8)

const VariantInner = styled.div`
  border-radius: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ left }) => left * 100}%;
  right: ${({ right }) => right * 100}%;
  background-color: ${({ color }) => color};
`

class VariantBar extends React.Component {
  render() {
    return this.props.percentages.map(({ start, end }) => (
      <VariantInner
        key={`${start.value}-${end.value}`}
        left={start.value}
        right={1 - end.value}
        color={this.props.color}
      />
    ))
  }
}

const ExperimentWrapper = styled.div`
  border-radius: 4px;
  height: 10px;
  background-color: #ddd;
  position: relative;
`

const BASE_COLORS = shuffle(['#f00', '#0f0', '#00f'])

class ExperimentBar extends React.Component {
  render() {
    return (
      <ExperimentWrapper>
        {Object.entries(this.props.experiments).map(
          ([experiment, variants], index) => {
            return Object.entries(variants).map(([variant, percentages]) => (
              <VariantBar
                key={`${experiment}/${variant}`}
                percentages={percentages}
                color={mix(0.4, getRandomColor(), BASE_COLORS[index])}
              />
            ))
          }
        )}
      </ExperimentWrapper>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <ExperimentBar experiments={experiments} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
