import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../components/fields/renderTextField'
import renderWysiwgyField from '../../components/fields/renderWysiwgyField'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/texts'

class AdminTextEdit extends Component {
  componentWillReceiveProps({ dispatch, submitSucceeded, item }) {
    if (submitSucceeded && !item.editing) {
      dispatch(stopEdit(item._id))
    }
  }
  render() {
    const { dispatch, error, handleSubmit, item, submitting } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values })))}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE CARD'}
              primary={true}
              style={{ flex: '0 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDelete(item._id, item.image))}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(stopEdit(item._id))}
            />
          </div>
        }
        modal={false}
        open={item.editing}
        onRequestClose={() => dispatch(stopEdit(item._id))}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <CardHeader title={`Text ${item._id}`}/>
        <form>
          <div>
            <Field
              name="text"
              component={renderWysiwgyField}
            />
          </div>
          <div className="field-container">
            <Field
              name="flex"
              label="flex"
              className="field"
              component={renderTextField}
            />
            <Field
              name="margin"
              label="margin"
              className="field"
              component={renderTextField}
            />
            <Field
              name="padding"
              label="padding"
              className="field"
              component={renderTextField}
            />
            <Field
              name="width"
              label="width"
              className="field"
              component={renderTextField}
            />
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </Dialog>
    )
  }
}

AdminTextEdit = compose(
  connect((state, { item }) => {
    const values = item.values || {}
    return {
      form: `text_${item._id}`,
      item,
      initialValues: values,
    }
  }),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminTextEdit)

export default AdminTextEdit
