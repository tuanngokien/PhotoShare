import React from "react";
import { render } from "react-dom";
import Grid from "@material-ui/core/Grid/Grid";
import Card from '@material-ui/core/Card';
import {Col, Row} from 'react-grid-system';
import Notifications from '../components/admin/Notifications.js';
import User from './../components/admin/User.js';

const noti = [
  "Tài khoản Nguyễn Văn A ảnh có nội dung xấu",
  "Tài khoản Trần Thị B ảnh có nội dung chống phá và kích động",
  "Tài khoản Lê Văn C nhập sai mật khẩu quá 10 lần, tạm khóa",
  "Tài khoản Lê Thị D có dấu hiệu đăng nhập bất thường",
]
export default class Admin extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container' style = {{marginTop: '6%'}}>
        <Row>
          <Col xs={12} md={9.2}>
            <Row style={{marginBottom: '5%'}}>
              <Col xs={3.5}>
                <a href='#/pts/admin' style={{color: 'black'}}>
                  <Card>
                    <Row>
                      <Col md={4}>
                        <img src={require("./../assets/img/user.png")}
                             alt="user"
                              style={{
                                width:'60px',
                                marginLeft: '20px',
                                marginTop: '10px',
                              }}
                        />
                      </Col>
                      <Col md={8} style={{marginBottom: '20px'}}>
                        <h4 style={{marginBottom: '0'}}> 11 </h4>
                        <span style={{marginBottom: '10px'}}> Total Users </span>
                      </Col>
                    </Row>
                  </Card>
                </a>
              </Col>
              <Col xs={3.5}>
                <a href='#/pts/admin' style={{color: 'black'}}>
                  <Card>
                    <Row>
                     <Col md={4}>
                        <img src={require("./../assets/img/post-it.png")}
                              alt="post"
                              style={{
                                width:'60px',
                                marginLeft: '20px',
                                marginTop: '10px',
                              }}
                        />
                     </Col>
                      <Col md={8} style={{marginBottom: '20px'}}>
                        <h4 style={{marginBottom: '0'}}> 245 </h4>
                        <span style={{marginBottom: '10px'}}> Total Posts </span>
                      </Col>
                    </Row>
                  </Card>
                </a>
              </Col>
              <Col xs={3.5}>
                <a href='#/pts/admin' style={{color: 'black'}}>
                  <Card>
                    <Row>
                     <Col md={4}>
                      <img  src={require("./../assets/img/photo.png")}
                            alt="photo"
                            style={{
                              width:'60px',
                              marginLeft: '20px',
                              marginTop: '10px',
                            }}
                      />
                     </Col>
                      <Col md={8} style={{marginBottom: '20px'}}>
                        <h4 style={{marginBottom: '0'}}> 365 </h4>
                        <span style={{marginBottom: '10px'}}> Total Photos </span>
                      </Col>
                    </Row>
                  </Card>
                </a>
              </Col>
            </Row>
        <Card>
          <User/>
        </Card>
        <br />
          </Col>
          <Col xs={12} md={2.8} style={{padding: 0}} id={"dashboard-sidebar"}>
                  <Notifications keywordList={noti}/>
          </Col>
        </Row>
      </div>
    );
  }
}
