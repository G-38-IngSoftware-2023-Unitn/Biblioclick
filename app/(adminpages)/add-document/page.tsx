'use client';
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import { Button, Form, message } from 'antd';
import Link from 'next/link'
import React from 'react'
import axios from "@/node_modules/axios/index";
import { useRouter } from "@/node_modules/next/navigation";

interface documentType {
    title: string;
    ISBN: number;
    author: string;
    publication_date: Date;
    genre: string;
    description: string;
    publisher: string;
}

function AddDocument() {

    const router = useRouter();
    const onFinish = async (values: documentType) => {
    try {
        await axios.post("/api/documentDB/add-document", values);
        message.success("Succesfully added new document");
        router.push("/");
    } catch (error: any) {
        message.error(error.response.data.message);
    }
    };
    
    return (
        <main>
        <Form className='w-[500px] gap-5' layout='vertical' onFinish={onFinish} >
                <h1 className='text-2x1 font-bold'>Add document</h1>
                <hr/>
                <br/>

                <Form.Item name="title" label="title" rules={[{ required: true }]}>
                    <input type='text' />
                </Form.Item>
                <Form.Item name="ISBN" label="ISBN" rules={[{ required: true }]}>
                    <input type='number' />
                </Form.Item>
                <Form.Item name="author" label="author" rules={[{ required: true }]}>
                    <input type='text' />
                </Form.Item>
                <Form.Item name="publisher" label="publisher">
                    <input type='text' />
                </Form.Item>
                <Form.Item name="publication_date" label="publication_date" >
                    <input type='date' />
                </Form.Item>
                <Form.Item name="genre" label="genre" >
                    <input type='text' />
                </Form.Item>
                <Form.Item name="description" label="description">
                    <input type='text' />
                </Form.Item>

                <Button type="primary" htmlType="submit" block className="text-black">
                Add Document
                </Button>

        </Form>
        </main>
    )
}
export default AddDocument