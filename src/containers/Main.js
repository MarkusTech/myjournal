import React, { Component } from "react";
import { connect } from "react-redux";
import DiaryForm from "../components/DiaryForm";
import { addItem, deleteItem } from "../redux/actions";
import DiaryItem from "../components/DiaryItem"
import { Modal } from "react-bootstrap";
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import LaptopIcon from '@mui/icons-material/Laptop';


export class Main extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      activeItem: null
    };
  }
  render() {
    const { addItem, diaryItems, deleteItem } = this.props;
    const { show, activeItem } = this.state
    return (
      <div>
         <CssBaseline />
            <AppBar color="secondary" position="static">
                <Toolbar>
                    <GitHubIcon sx={
                        {
                            marginRight: "1em"
                        }
                    } />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        WMR 
                    </Typography>
                    <GitHubIcon  sx={
                        {
                            marginRight: "1em"
                        }
                    } />
                    <CodeOffIcon sx={
                        {
                            marginRight: "1em"
                        }
                    }/>
                    <LaptopIcon />
                </Toolbar>
            </AppBar>
        <div className="grid-container">
          <div className="diary-app">
            <h1>Thoughts for the day</h1>
            <DiaryForm addItem={(item) => addItem(item)} />
          </div>
          <div className="diary-app" style={{ paddingTop: 20 }}>
            {diaryItems.length > 0 ? (
              diaryItems.map((item) => {
                return (
                  <DiaryItem
                    deleteItem={(id) => deleteItem(id)}
                    showModal={(item) =>
                      this.setState({ show: true, activeItem: item })
                    }
                    key={item.id}
                    item={item}
                  />
                );
              })
            ) : (
              <h1>No Task</h1>
            )}
          </div>
        </div>
        <Modal
          size="lg"
          show={show}
          onHide={() => this.setState({ show: false })}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {activeItem?.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {activeItem?.text}
          </Modal.Body>
          <Modal.Footer>
            {activeItem?.date}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  diaryItems: state.diaryItems,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  deleteItem: (id) => dispatch(deleteItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);


