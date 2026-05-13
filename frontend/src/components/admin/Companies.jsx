import React from 'react'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    // Check if recruiter has already created a company
    const hasCreatedCompany = companies && companies.length > 0;

    const handleCreateCompany = () => {
        if (hasCreatedCompany) {
            alert("You can only create one company. You have already created a company.");
        } else {
            navigate("/admin/companies/create");
        }
    };

    return (
        <div className='bg-mesh-light dark:bg-mesh-dark min-h-screen'>

            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-end my-5'>
                    <Button
                        onClick={handleCreateCompany}
                        disabled={hasCreatedCompany}
                        title={hasCreatedCompany ? "You can only create one company" : "Create a new company"}
                    >
                        {hasCreatedCompany ? "Company Already Created" : "New Company"}
                    </Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies