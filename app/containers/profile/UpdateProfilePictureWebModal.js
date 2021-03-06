import {StyleSheet, View, Platform} from 'react-native';
import Modal from 'modal-enhanced-react-native-web';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Icon, Text} from 'react-native-elements';
import i18n from 'i18n-js';
import {Col, Grid, Row} from 'react-native-easy-grid';
import * as React from 'react';
import ReactCrop from 'react-image-crop';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useDerbyTheme} from '../../utils/theme';
import {uploadPicture} from '../../actions/profile';

// @TODO move this in index.html
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(
    document.createTextNode(
      '.ReactCrop {\n' +
        '  position: relative;\n' +
        '  display: inline-block;\n' +
        '  cursor: crosshair;\n' +
        '  overflow: hidden;\n' +
        '  max-width: 100%; }\n' +
        '.ReactCrop:focus {\n' +
        '  outline: none; }\n' +
        '.ReactCrop--disabled, .ReactCrop--locked {\n' +
        '  cursor: inherit; }\n' +
        '.ReactCrop__image {\n' +
        '  display: block;\n' +
        '  max-width: 100%;\n' +
        '  touch-action: manipulation; }\n' +
        '.ReactCrop__crop-selection {\n' +
        '  position: absolute;\n' +
        '  top: 0;\n' +
        '  left: 0;\n' +
        '  transform: translate3d(0, 0, 0);\n' +
        '  box-sizing: border-box;\n' +
        '  cursor: move;\n' +
        '  box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);\n' +
        '  touch-action: manipulation;\n' +
        '  border: 1px solid;\n' +
        '  border-image-source: url("data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP///////wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEI5RDc5MTFDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEI5RDc5MTBDNkE2MTFFM0JCMDZEODI2QTI4MzJBOTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyODAxMTc0MDcyMDY4MTE4MDgzQzNDMjA5MzREQ0ZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQoAAgAsAAAAAAoACgAAAhWEERkn7W3ei7KlagMWF/dKgYeyGAUAIfkEBQoAAgAsAAAAAAoACgAAAg+UYwLJ7RnQm7QmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYgLJHdiinNSAVfOEKoUCACH5BAUKAAIALAAAAAAKAAoAAAIRVISAdusPo3RAzYtjaMIaUQAAIfkEBQoAAgAsAAAAAAoACgAAAg+MDiem7Q8bSLFaG5il6xQAIfkEBQoAAgAsAAAAAAoACgAAAg+UYRLJ7QnQm7SmsCyVKhUAIfkEBQoAAgAsAAAAAAoACgAAAhCUYBLJDdiinNSEVfOEKoECACH5BAUKAAIALAAAAAAKAAoAAAIRFISBdusPo3RBzYsjaMIaUQAAOw==");\n' +
        '  border-image-slice: 1;\n' +
        '  border-image-repeat: repeat; }\n' +
        '.ReactCrop--disabled .ReactCrop__crop-selection {\n' +
        '  cursor: inherit; }\n' +
        '.ReactCrop--circular-crop .ReactCrop__crop-selection {\n' +
        '  border-radius: 50%;\n' +
        '  box-shadow: 0px 0px 1px 1px white, 0 0 0 9999em rgba(0, 0, 0, 0.5); }\n' +
        '.ReactCrop--invisible-crop .ReactCrop__crop-selection {\n' +
        '  display: none; }\n' +
        '.ReactCrop__rule-of-thirds-vt::before, .ReactCrop__rule-of-thirds-vt::after, .ReactCrop__rule-of-thirds-hz::before, .ReactCrop__rule-of-thirds-hz::after {\n' +
        "  content: '';\n" +
        '  display: block;\n' +
        '  position: absolute;\n' +
        '  background-color: rgba(255, 255, 255, 0.4); }\n' +
        '.ReactCrop__rule-of-thirds-vt::before, .ReactCrop__rule-of-thirds-vt::after {\n' +
        '  width: 1px;\n' +
        '  height: 100%; }\n' +
        '.ReactCrop__rule-of-thirds-vt::before {\n' +
        '  left: 33.3333%;\n' +
        '  left: calc(100% / 3); }\n' +
        '    .ReactCrop__rule-of-thirds-vt::after {\n' +
        '    left: 66.6666%;\n' +
        '    left: calc(100% / 3 * 2); }\n' +
        '      .ReactCrop__rule-of-thirds-hz::before, .ReactCrop__rule-of-thirds-hz::after {\n' +
        '      width: 100%;\n' +
        '      height: 1px; }\n' +
        '  .ReactCrop__rule-of-thirds-hz::before {\n' +
        '      top: 33.3333%;\n' +
        '      top: calc(100% / 3); }\n' +
        '        .ReactCrop__rule-of-thirds-hz::after {\n' +
        '        top: 66.6666%;\n' +
        '        top: calc(100% / 3 * 2); }\n' +
        '          .ReactCrop__drag-handle {\n' +
        '          position: absolute; }\n' +
        '      .ReactCrop__drag-handle::after {\n' +
        '          position: absolute;\n' +
        "          content: '';\n" +
        '          display: block;\n' +
        '          width: 10px;\n' +
        '          height: 10px;\n' +
        '          background-color: rgba(0, 0, 0, 0.2);\n' +
        '          border: 1px solid rgba(255, 255, 255, 0.7);\n' +
        '          box-sizing: border-box;\n' +
        '          outline: 1px solid transparent; }\n' +
        '      .ReactCrop .ord-nw {\n' +
        '          top: 0;\n' +
        '          left: 0;\n' +
        '          margin-top: -5px;\n' +
        '          margin-left: -5px;\n' +
        '          cursor: nw-resize; }\n' +
        '      .ReactCrop .ord-nw::after {\n' +
        '          top: 0;\n' +
        '          left: 0; }\n' +
        '      .ReactCrop .ord-n {\n' +
        '          top: 0;\n' +
        '          left: 50%;\n' +
        '          margin-top: -5px;\n' +
        '          margin-left: -5px;\n' +
        '          cursor: n-resize; }\n' +
        '      .ReactCrop .ord-n::after {\n' +
        '          top: 0; }\n' +
        '      .ReactCrop .ord-ne {\n' +
        '          top: 0;\n' +
        '          right: 0;\n' +
        '          margin-top: -5px;\n' +
        '          margin-right: -5px;\n' +
        '          cursor: ne-resize; }\n' +
        '      .ReactCrop .ord-ne::after {\n' +
        '          top: 0;\n' +
        '          right: 0; }\n' +
        '      .ReactCrop .ord-e {\n' +
        '          top: 50%;\n' +
        '          right: 0;\n' +
        '          margin-top: -5px;\n' +
        '          margin-right: -5px;\n' +
        '          cursor: e-resize; }\n' +
        '      .ReactCrop .ord-e::after {\n' +
        '          right: 0; }\n' +
        '      .ReactCrop .ord-se {\n' +
        '          bottom: 0;\n' +
        '          right: 0;\n' +
        '          margin-bottom: -5px;\n' +
        '          margin-right: -5px;\n' +
        '          cursor: se-resize; }\n' +
        '      .ReactCrop .ord-se::after {\n' +
        '          bottom: 0;\n' +
        '          right: 0; }\n' +
        '      .ReactCrop .ord-s {\n' +
        '          bottom: 0;\n' +
        '          left: 50%;\n' +
        '          margin-bottom: -5px;\n' +
        '          margin-left: -5px;\n' +
        '          cursor: s-resize; }\n' +
        '      .ReactCrop .ord-s::after {\n' +
        '          bottom: 0; }\n' +
        '      .ReactCrop .ord-sw {\n' +
        '          bottom: 0;\n' +
        '          left: 0;\n' +
        '          margin-bottom: -5px;\n' +
        '          margin-left: -5px;\n' +
        '          cursor: sw-resize; }\n' +
        '      .ReactCrop .ord-sw::after {\n' +
        '          bottom: 0;\n' +
        '          left: 0; }\n' +
        '      .ReactCrop .ord-w {\n' +
        '          top: 50%;\n' +
        '          left: 0;\n' +
        '          margin-top: -5px;\n' +
        '          margin-left: -5px;\n' +
        '          cursor: w-resize; }\n' +
        '      .ReactCrop .ord-w::after {\n' +
        '          left: 0; }\n' +
        '      .ReactCrop__disabled .ReactCrop__drag-handle {\n' +
        '          cursor: inherit; }\n' +
        '      .ReactCrop__drag-bar {\n' +
        '          position: absolute; }\n' +
        '      .ReactCrop__drag-bar.ord-n {\n' +
        '          top: 0;\n' +
        '          left: 0;\n' +
        '          width: 100%;\n' +
        '          height: 6px;\n' +
        '          margin-top: -3px; }\n' +
        '      .ReactCrop__drag-bar.ord-e {\n' +
        '          right: 0;\n' +
        '          top: 0;\n' +
        '          width: 6px;\n' +
        '          height: 100%;\n' +
        '          margin-right: -3px; }\n' +
        '      .ReactCrop__drag-bar.ord-s {\n' +
        '          bottom: 0;\n' +
        '          left: 0;\n' +
        '          width: 100%;\n' +
        '          height: 6px;\n' +
        '          margin-bottom: -3px; }\n' +
        '      .ReactCrop__drag-bar.ord-w {\n' +
        '          top: 0;\n' +
        '          left: 0;\n' +
        '          width: 6px;\n' +
        '          height: 100%;\n' +
        '          margin-left: -3px; }\n' +
        '      .ReactCrop--new-crop .ReactCrop__drag-bar,\n' +
        '      .ReactCrop--new-crop .ReactCrop__drag-handle,\n' +
        '      .ReactCrop--fixed-aspect .ReactCrop__drag-bar {\n' +
        '          display: none; }\n' +
        '      .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-n,\n' +
        '      .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-e,\n' +
        '      .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-s,\n' +
        '      .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-w {\n' +
        '          display: none; }\n' +
        '      @media (pointer: coarse) {\n' +
        '        .ReactCrop .ord-n,\n' +
        '        .ReactCrop .ord-e,\n' +
        '        .ReactCrop .ord-s,\n' +
        '        .ReactCrop .ord-w {\n' +
        '            display: none; }\n' +
        '        .ReactCrop__drag-handle {\n' +
        '            width: 24px;\n' +
        '            height: 24px; } }',
    ),
  );
  document.head.appendChild(style);
}

export default function UpdateProfilePictureWebModal(props) {
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({
    aspect: 1,
    width: 100,
    height: 100,
  });
  const [src, setSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const {colors, sizes} = useDerbyTheme();

  const submitButtonStyle = [
    styles.submitButton,
    {backgroundColor: colors.primary},
  ];

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', (a) => {
        setSrc({src: reader.result});
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  const makeClientCrop = async (theCrop) => {
    if (imageRef && theCrop.width && theCrop.height) {
      const blobCropped = await getCroppedImg(
        imageRef,
        theCrop,
        'newFile.jpeg',
      );
      setCroppedImage(blobCropped);
    }
  };

  const onCropComplete = async (crop) => {
    await makeClientCrop(crop);
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={props.visible} onBackdropPress={props.onBackdropPress}>
        <ScrollView style={{backgroundColor: '#ffffff'}}>
          <View style={styles.modalContent}>
            <View style={{padding: sizes.BASE / 2}}>
              <Text h3 style={{margin: sizes.BASE / 4}}>
                {i18n.t('profile_card_crop_modal_title')}
              </Text>
              <Grid
                style={{
                  paddingVertical: sizes.BASE / 2,
                  paddingHorizontal: sizes.BASE / 4,
                }}>
                <Row>
                  <Col style={{justifyContent: 'center'}}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onSelectFile}
                    />
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    {croppedImage && (
                      <Button
                        icon={
                          <Icon
                            type="material-community"
                            name="arrow-up"
                            containerStyle={{marginRight: sizes.BASE / 2}}
                            size={sizes.FONT * 1.5}
                            color={colors.background}
                          />
                        }
                        onPress={async () => {
                          try {
                            await dispatch(
                              uploadPicture(
                                {
                                  blob: true,
                                  uri: croppedImage,
                                  name: `newFile.jpeg`,
                                  type: `image/jpeg`,
                                },
                                () => {},
                              ),
                            );

                            await props.onBackdropPress();
                            await setCroppedImage(null);
                            await setImageRef(null);
                            await setSrc(null);
                          } catch (e) {
                            console.log('error uploading cropped image', e);
                          }
                        }}
                        title={i18n.t('profile_card_crop_modal_submit')}
                        buttonStyle={submitButtonStyle}
                        titleStyle={{fontSize: sizes.BASE}}
                      />
                    )}
                  </Col>
                </Row>
              </Grid>
              {src !== null && (
                <ReactCrop
                  imageStyle={{
                    maxHeight: 350,
                  }}
                  src={src.src}
                  crop={crop}
                  ruleOfThirds
                  onImageLoaded={onImageLoaded}
                  onComplete={onCropComplete}
                  onChange={(newCrop) => {
                    setCrop(newCrop);
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 3,
    overflow: 'scroll',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    borderRadius: 30,
  },
});
