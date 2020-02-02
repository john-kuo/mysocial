export default {
    palette: {
      primary: {
        main: '#64b5f6',
        dark: '#008394',
        contrastText: '#fff'
      },
      secondary: {
        main: '#1976d2',
        dark: '#b22a00',
        contrastText: '#fff'
      },
    },
    spreadIt: {
      form: {
        textAlign: 'center'
      },
      pageTitle: {
          margin: '20px auto 20px auto'
      },
      TextField: {
          margin: '20px auto 20px auto'
      },
      customeError: {
          color: 'red',
          fontSize: '0.8rem'
      },
      button: {
          marginTop: 20,
          position: 'relative'
      },
      progress: {
          position: 'absolute'
      }
    
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      'profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#64b5f6'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }  
  }