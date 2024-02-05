'use client';
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import { Button, Form, message } from 'antd';
import Link from 'next/link'
import React from 'react'
import axios from "@/node_modules/axios/index";
import { useRouter } from "@/node_modules/next/navigation";

interface documentCopy {
    documentId: string,
    reservationStatus: boolean,
    loanStatus: boolean,
    isLoanable: boolean,
}

function AddDocument() {

    const router = useRouter();
    const onFinish = async (values: documentCopy) => {
    try {
        await axios.post("/api/documentDB/create-document-copy", values);
        message.success("Succesfully added new document");
        location.reload();
    } catch (error: any) {
        message.error(error.response.data.message);
    }
    };
    
    return (
        <main>
        <Form className='w-[500px] gap-5' layout='vertical' onFinish={onFinish} >
                <h1 className='text-2x1 font-bold'>Create copy (admin temp tools)</h1>
                <hr/>
                <br/>

                <Form.Item name="documentId" label="documentId" rules={[{ required: true }]}>
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