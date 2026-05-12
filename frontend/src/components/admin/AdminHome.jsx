import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Briefcase, Users, PlusCircle, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchApplicants } from '../../redux/applicationSlice';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const AdminHome = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector(store => store.company);
  const { allAdminJobs } = useSelector(store => store.job);
  const { applicants } = useSelector(store => store.application);
  const navigate = useNavigate();

  useGetAllCompanies();
  useGetAllAdminJobs();

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch]);

  const totalApplicants = applicants.length;
  const currentCompany = companies[0];
  const companyName = currentCompany?.name || 'N/A';

  const stats = [
    { title: 'Company Name', value: companyName, icon: Building, accent: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30', clickable: false },
    { title: 'Listed Jobs', value: allAdminJobs.length, icon: Briefcase, accent: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30', onClick: () => navigate('/admin/jobs') },
    { title: 'Total Applicants', value: totalApplicants, icon: Users, accent: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30', onClick: () => navigate('/admin/applicants') },
  ];

  const quickLinks = [
    { title: 'Post New Job', path: '/admin/jobs/create', icon: PlusCircle, color: 'from-indigo-500 to-indigo-600' },
    {
      title: 'Update Company',
      path: currentCompany?._id ? `/admin/companies/${currentCompany._id}` : '/admin/companies/create',
      icon: Building,
      color: 'from-red-500 to-red-600',
      disabled: !currentCompany,
    },
  ];

  return (
    <div className="min-h-screen bg-mesh-light dark:bg-mesh-dark">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 tracking-widest uppercase mb-1">Overview</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Recruiter Dashboard</h1>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={item.clickable === false ? undefined : { y: -4 }}
              className={`glass-card rounded-2xl p-6 flex items-center transition-all duration-300 ${item.clickable === false ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={item.clickable === false ? undefined : item.onClick}
            >
              <div className={`${item.bg} p-4 rounded-xl mr-5 transition-colors duration-200`}>
                <item.icon className={`w-6 h-6 ${item.accent}`} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.title}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-600 ml-auto" />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 tracking-widest uppercase mb-1">Actions</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={link.path} className={`block ${link.disabled ? 'pointer-events-none opacity-60' : ''}`}>
                  <div className={`bg-gradient-to-r ${link.color} rounded-2xl p-6 flex items-center text-white red-glow transition-all duration-300`}>
                    <div className="bg-white/20 p-3 rounded-xl mr-4">
                      <link.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{link.title}</h3>
                    <ArrowRight className="w-5 h-5 ml-auto opacity-70" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Recent Companies</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500">No recent companies to display.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Recent Job Posts</h2>
            <p className="text-sm text-gray-400 dark:text-gray-500">No recent job posts to display.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
