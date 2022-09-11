import React, { useState, useEffect } from 'react';

import VolunteerImage from './volunteerImage.component';
import GenderComponent from './volunteerGender.component';
import {
	convertEducationLevel,
	convertEmploymentStatus,
} from '../utilities/volunteerUtilities';
import {
	faMapMarkerAlt,
	faBriefcase,
	faGraduationCap,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VolunteerCard = ({ volunteer, onClick }) => {
	const clickVolunteer = () => {
		onClick(volunteer.parentId);
	};

	return (
		<div
			onClick={clickVolunteer}
			className="w-auto max-h-72 rounded-xl bg-gray-600 overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 border-solid transition transform duration-500 ease-in-out hover:scale-105 cursor-pointer select-none"
		>
			<div className="w-full h-48 p-4 flex flex-row">
				<div className="w-auto h-full">
					<VolunteerImage image={volunteer.image} />
				</div>
				<div className=" h-full whitespace-nowrap">
					<div className="w-full h-full pl-2 pt-3">
						<p className="text-xl font-bold m-0 text-white">
							{' '}
							{volunteer.firstName} {volunteer.lastName}{' '}
							<GenderComponent gender={volunteer.gender} colour="white" />
						</p>{' '}
						<div className="flex flex-row items-center gap-2 text-gray-100">
							<FontAwesomeIcon
								style={{ width: '16px', height: '16px' }}
								icon={faMapMarkerAlt}
							/>{' '}
							{volunteer.city}
							<p className="m-0 text-gray-100"></p>
						</div>
						<div className="flex flex-row items-center gap-2 text-gray-100">
							<FontAwesomeIcon
								style={{ width: '16px', height: '16px' }}
								icon={faBriefcase}
							/>
							<p className="m-0 text-gray-100">
								{convertEmploymentStatus(volunteer.employmentStatus)}
							</p>
						</div>
						<div className="flex flex-row items-center gap-2 text-gray-100">
							<FontAwesomeIcon
								style={{ width: '16px', height: '16px' }}
								icon={faGraduationCap}
							/>
							<p className="m-0 text-gray-100">
								{convertEducationLevel(volunteer.educationLevel)}
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* {volunteer.about ? (
				<div className="w-full h-24 bg-gray-50 p-3 overflow-y-scroll">
					<p> {volunteer.about} </p>
				</div>
			) : null} */}
		</div>
	);
};

export default VolunteerCard;
