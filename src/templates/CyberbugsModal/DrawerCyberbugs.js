import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
export default function DrawerCyberbugs(props) {

    const { Option } = Select;
    const visible = useSelector(state => state.drawerReducer.visible);
    const ComponentContentDrawer = useSelector(state => state.drawerReducer.ComponentContentDrawer);
    const callBackSubmit = useSelector(state => state.drawerReducer.callBackSubmit);
    const title = useSelector(state=>state.drawerReducer.title)

    const dispatch = useDispatch()

    const showDrawer = () => {
        dispatch({
            type: 'OPEN_DRAWER'
        })
    };
    const onClose = () => {
        dispatch({
            type: 'CLOSE_DRAWER'
        })
    };

    return (
        <div>
            <>
                <Drawer
                    title={title}
                    width={720}
                    onClose={onClose}
                    open={visible}
                    bodyStyle={{
                        paddingBottom: 80,
                    }}
                    footer={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={callBackSubmit} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    {/* Nội dung thay đổi của Drawer (HOC) */}
                    {ComponentContentDrawer}
                </Drawer>
            </>
        </div>
    )
}
