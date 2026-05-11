import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
        <div className='glass-card rounded-2xl overflow-hidden'>
            <Table>
                <TableCaption className="text-gray-500 dark:text-gray-400">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Date</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Job Role</TableHead>
                        <TableHead className="font-semibold text-gray-900 dark:text-gray-100">Company</TableHead>
                        <TableHead className="text-right font-semibold text-gray-900 dark:text-gray-100">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">
                                You haven't applied to any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5">
                                <TableCell className="text-gray-700 dark:text-gray-300">{new Date(appliedJob?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="font-medium text-gray-900 dark:text-white">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-gray-700 dark:text-gray-300">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`
                                        ${appliedJob?.status === "rejected" ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50' : 
                                          appliedJob.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50' : 
                                          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'}
                                        px-3 py-1 rounded-full text-xs font-bold border
                                    `}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
