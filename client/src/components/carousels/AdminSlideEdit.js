import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../components/fields/renderTextField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdateSub, fetchDeleteSub, stopEditSlide } from '../../actions/carousels'

const fields = [
  'color',
  'mediaBackgroundColor',
  'contentBackgroundColor',
  'title',
  'subtitle'
]

class AdminSlideEdit extends Component {
  state = {
    imageEdit: false
  }
  handleImageEdit = (bool) => {
    this.setState({ imageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleImageDelete = (_id, update) => {
    const { carouselId } = this.props
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdateSub(carouselId, _id, update))
  }
  handleForm = (values) => {
    const { dispatch, item: { _id, image }} = this.props
    if (this.state.imageEdit) {
      const newImage = this.editor.handleSave()
      const remmoveImageSrc = image.src
      return dispatch(fetchUpdateSub(_id, { type: 'UPDATE_IMAGE_AND_VALUES', image: newImage, remmoveImageSrc, values }))
    } else {
      return dispatch(fetchUpdateSub(_id, { type: 'UPDATE_VALUES', values }))
    }
  }
  handleRemoveSub = () => {
    const { carouselId, dispatch, editSlide } = this.props
    return dispatch(fetchDeleteSub(carouselId, editSlide._id, editSlide.image))
  }
  handleStopEdit = () => this.props.dispatch(stopEditSlide(this.props.editSlide._id))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      carouselId,
      dispatch,
      error,
      handleSubmit,
      open,
      editSlide,
      submitting
    } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit(values => this.handleForm(values))}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE SLIDE'}
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="Remove Slide"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={this.handleRemoveSub}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={this.handleStopEdit}
            />
          </div>
        }
        modal={false}
        open={open}
        onRequestClose={this.handleStopEdit}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <CardHeader title={`Slide ${editSlide._id}`} titleStyle={{ fontSize: 16 }} />
        <CardMedia>
          <form>
            <ImageForm
              image={editSlide.image}
              type="image/jpg"
              _id={editSlide._id}
              onImageEdit={this.handleImageEdit}
              onImageDelete={this.handleImageDelete}
              ref={this.setEditorRef}
            />
            <div className="field-container">
              {fields.map(field => (
                <Field
                  key={field}
                  name={field}
                  label={field}
                  className="field"
                  component={renderTextField}
                />
              ))}
            </div>
          </form>
        </CardMedia>
        {error && <div className="error">{error}</div>}
      </Dialog>
    )
  }
}

AdminSlideEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  carouselId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  editSlide: PropTypes.object.isRequired
}

export default reduxForm({})(AdminSlideEdit)
