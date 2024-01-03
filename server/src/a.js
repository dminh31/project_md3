import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ManagerUsers = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        // Xử lý khi form được gửi
        console.log('Received values:', values);
        setIsModalVisible(false);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Chỉ được tải lên file JPG/PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Kích thước ảnh không được vượt quá 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    return (
        <main style={{ marginTop: 58 }}>
            <div className="container pt-4">
                <div>
                    <Button onClick={showModal}>Thêm Sản Phẩm</Button>
                    <Modal
                        title="Thêm Sản Phẩm"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <Form onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Tên Sản Phẩm"
                                        name="productName"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                                    >
                                        <Input placeholder="Nhập tên sản phẩm" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Danh Mục"
                                        name="category"
                                        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                                    >
                                        <Select placeholder="Chọn danh mục">
                                            <Option value="category1">Danh Mục 1</Option>
                                            <Option value="category2">Danh Mục 2</Option>
                                            {/* Thêm các danh mục khác vào đây */}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Giá"
                                        name="price"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                                    >
                                        <Input placeholder="Nhập giá sản phẩm" type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Ảnh Sản Phẩm"
                                        name="image"
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        rules={[{ required: true, message: 'Vui lòng chọn ảnh sản phẩm!' }]}
                                    >
                                        <Upload
                                            beforeUpload={beforeUpload}
                                            listType="picture"
                                            maxCount={1}
                                        >
                                            <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Số Lư"
                                        name="price"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                                    >
                                        <Input placeholder="Nhập giá sản phẩm" type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="sdsdas"
                                        name="soluong"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                                    >
                                        <Input placeholder="Nhập giá sản phẩm" type="text" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* Thêm các ô input cho các thông tin khác của sản phẩm vào đây */}
                            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                                <Button type="primary" htmlType="submit">
                                    Lưu
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </main>
    );
};

export default ManagerUsers;