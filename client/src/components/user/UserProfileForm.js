import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import normalizePhone from '../../utils/normalizePhone'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match'
  }
  return errors
}

const UserProfileForm = ({
  dispatch,
  error,
  handleSubmit,
  onDelete,
  onFormSubmit,
  submitSucceeded,
  submitting
}) => (
  <Card className="UserProfileForm">
    <CardTitle title="User" />
    <form onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="field-container">
        <Field name="firstName" component={renderTextField} label="First Name" className="field" />
        <Field name="lastName" component={renderTextField} label="Last Name" className="field" />
        <Field name="email" component={renderTextField} label="Email" className="field" />
        <Field name="phone" component={renderTextField} label="Phone" normalize={normalizePhone} className="field" />
        <Field name="password" component={renderTextField} label="Update Password" type="password" className="field" />
        <Field name="passwordConfirm" component={renderTextField} label="Confirm Password" type="password" className="field"/>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="button-container">
        <SuccessableButton
          submitSucceeded={submitSucceeded}
          submitting={submitting}
          label="update user"
          successLabel="user updated!"
        />
        <RaisedButton
          type="button"
          label="Delete Account"
          className="button delete-button"
          onTouchTap={onDelete}
        />
      </div>
    </form>
  </Card>
)

UserProfileForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

export default reduxForm({})(UserProfileForm)